import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'itemFilter'
})

export class ItemPipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        let filter = args[0];

        if(filter){
            filter.toLocaleLowerCase();
        }

        return filter ? value.filter(item => item.name.toLocaleLowerCase().indexOf(filter) != -1): value;
    }
}