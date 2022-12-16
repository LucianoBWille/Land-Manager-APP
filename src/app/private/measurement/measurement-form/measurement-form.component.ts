import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Measurement } from '../measurement.model';
import { MeasurementService } from '../measurement.service';

@Component({
  selector: 'app-measurement-form',
  templateUrl: './measurement-form.component.html',
  styleUrls: ['./measurement-form.component.css']
})
export class MeasurementFormComponent {
  state: string = 'new';

  form: FormGroup;

  measurement: Measurement | undefined;

  constructor(
    private measurementService: MeasurementService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      deviceId: this.formBuilder.control(''),
      value: this.formBuilder.control(''),
    });
  }

  get title() {
    if (this.state === 'new') return 'New measurement';
    if (this.state === 'view') return 'View measurement';
    return 'Measurement';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);

      if (!params['id']) {
        this.state = 'new';
      } else {
        this.form.get('deviceId')?.disable();
        this.form.get('value')?.disable();
        this.measurementService
          .getMeasurement(params['id'])
          .pipe(
            catchError((error) => {
              console.log(error);
              throw new Error(error);
            })
          )
          .subscribe((res: Measurement) => {
            console.log("received measurement: ", res)
            this.measurement = res;
            this.state = 'view';
            this.updateForm(this.measurement);
          });
      }
    });
  }

  updateForm(measurement: Measurement) {
    this.form.controls['deviceId'].setValue(measurement.deviceId);
    this.form.controls['value'].setValue(measurement.value);
  }

  saveOrUpdate() {
    const m = new Measurement();
    m.deviceId = this.form.controls['deviceId'].value;
    m.value = this.form.controls['value'].value;

    if (this.measurement) {
      m._id = this.measurement._id;
    }

    this.measurementService
      .create(m)
      .pipe(
        catchError((error) => {
          console.log(error);
          alert("Falha ao salvar a medição")
          throw new Error(error);
        }
      ))
      .subscribe((res) => {
        console.log(res);
        alert('Medição salva com sucesso');
        this.router.navigate(['/app/measurement']);
      });
    }  
}
