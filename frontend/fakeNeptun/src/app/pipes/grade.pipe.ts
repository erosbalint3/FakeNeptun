import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'gradePipe'
})
export class GradePipe implements PipeTransform {
  transform(grade: number): string {
    switch (grade) {
      case 1:
        return 'Fail';
      case 2:
        return 'Satisfactory';
      case 3:
        return 'Good';
      case 4:
        return 'Very great';
      case 5:
        return 'Excellent';
      default:
        return '';
    }
  }
}
