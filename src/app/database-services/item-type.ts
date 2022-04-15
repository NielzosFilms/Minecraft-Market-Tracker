import {AbstractControl, ValidatorFn} from "@angular/forms";

export interface Category {
  id: string;
  name: string;
  items: Item[];
}

export interface Item {
  id: string;
  name: string;
  for_sale: boolean;
  price?: number;
  amount?: number;
  bulk_price?: number;
  category?: string;
}

export class FormItemValidator {
  static selectedValidValue(myArray: Item[]): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      let selectValue = c.value;
      if(!selectValue) return null;
      let pickedOrNot = myArray.filter(
        (alias) => alias.name === selectValue.name
      );

      if (pickedOrNot.length > 0) {
        // everything's fine. return no error. therefore it's null.
        return null;
      } else {
        //there's no matching selectboxvalue selected. so return match error.
        return { match: true };
      }
    };
  }
}

