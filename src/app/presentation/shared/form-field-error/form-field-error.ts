import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-form-field-error',
  standalone: true,
  template: `
    @if (isInvalidAndTouched()) {
      <div class="absolute -bottom-[1.1rem] left-1 flex flex-col z-10">
        @for (error of errors(); track $index) {
          <span class="text-red-500 text-[0.7rem] font-semibold leading-none whitespace-nowrap animate-[slideDown_0.2s_ease-out]">
            {{ error.message }}
          </span>
        }
      </div>
    }
  `,
  styles: `
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-3px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `
})
export class FormFieldError {
  form = input.required<any>();
  field = input.required<string>();

  private control = computed(() => {
    const f = this.form();
    const name = this.field();
    return f[name];
  });

  isInvalidAndTouched = computed(() => {
    const ctrl = this.control();
    if (!ctrl) return false;
    return ctrl().invalid() && ctrl().touched();
  });

  errors = computed(() => {
    const ctrl = this.control();
    if (!ctrl) return [];

    const state = ctrl();
    const errs = state.errors();

    if (!errs) return [];

    return Object.values(errs).map((e: any) => ({
      message: e.message || 'Campo no válido'
    }));
  });
}