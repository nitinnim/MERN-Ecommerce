import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilters }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>

      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem, id) => (
          <Fragment key={id}>
            <div>
              <h3 className="font-bold text-base">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((item) => (
                  <Label
                    key={item.id}
                    className="flex gap-2 items-center font-medium"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(item.id) > -1
                      }
                      onCheckedChange={() => handleFilters(keyItem, item.id)}
                    />
                    {item.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
