import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { Device } from '../device.model';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent {
  state: string = 'new';

  form: FormGroup;

  device: Device | undefined;

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(''),
      type: this.formBuilder.control(''),
    });
  }

  get title() {
    if (this.state === 'new') return 'New device';
    if (this.state === 'edit') return 'Edit device';
    return 'Device';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);

      if (!params['id']) {
        this.state = 'new';
      } else {
        this.deviceService
          .getDevice(params['id'])
          .pipe(
            catchError((error) => {
              console.log(error);
              throw new Error(error);
            })
          )
          .subscribe((res: Device) => {
            console.log("received device: ", res)
            this.device = res;
            this.state = 'edit';
            this.updateForm(this.device);
          });
      }
    });
  }

  updateForm(device: Device) {
    this.form.controls['name'].setValue(device.name);
    this.form.controls['type'].setValue(device.type);
  }

  saveOrUpdate() {
    const d = new Device();
    d.name = this.form.value.name;
    d.type = this.form.value.type;
    d.userId = JSON.parse(localStorage.getItem('token') || "").userId || ''

    if(this.device) {
      d._id = this.device._id;
    }

    this.deviceService
      .createOrUpdate(d)
      .pipe(
        catchError((err) => {
          console.log(err);
          alert('Falha ao salvar o dispositivo');
          throw new Error(err);
        }),
        finalize(() => {})
      )
      .subscribe((res) => {
        console.log(res);
        alert('Dispositivo salvo com sucesso');
        this.router.navigateByUrl('/app/device');
      });
  }
}
