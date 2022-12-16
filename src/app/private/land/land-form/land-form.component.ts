import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LandService } from '../land.service';
import { Land } from '../land.model';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-land-form',
  templateUrl: './land-form.component.html',
  styleUrls: ['./land-form.component.css']
})
export class LandFormComponent {
  state: string = 'new';

  form: FormGroup;

  land: Land | undefined;

  constructor(
    private landService: LandService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(''),
      landPoligonString: this.formBuilder.control(''),
    });
  }

  get title() {
    if (this.state === 'new') return 'New land';
    if (this.state === 'edit') return 'Edit land';
    return 'Land';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);

      if (!params['id']) {
        this.state = 'new';
      } else {
        this.landService
          .getLand(params['id'])
          .pipe(
            catchError((error) => {
              console.log(error);
              throw new Error(error);
            })
          )
          .subscribe((res: Land) => {
            this.land = res;
            this.state = 'edit';
            this.updateForm(this.land);
          });
      }
    });
  }

  updateForm(land: Land) {
    this.form.patchValue({
      name: land.name,
      landPoligonString: land.landPoligonString,
    });
  }

  saveOrUpdate() {
    const l = new Land();
    l.name = this.form.value.name;
    l.landPoligonString = this.form.value.landPoligonString;

    if (this.land) {
      l.id = this.land.id;
    }

    this.landService
      .createOrUpdate(l)
      .pipe(
        catchError((error) => {
          console.log(error);
          alert('Falha ao salvar o terreno');
          throw new Error(error);
        }),
        finalize(() => {})
      )
      .subscribe((res) => {
        console.log(res);
        alert('Terreno salvo com sucesso');
        this.router.navigate(['/app/land']);
      });
  }
}
