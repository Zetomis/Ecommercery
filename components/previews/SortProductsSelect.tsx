import { SortMethodType } from "@/constants";
import { Dispatch, SetStateAction } from "react";

const SortProductSelect = ({
    setSortMethod,
}: {
    setSortMethod: Dispatch<SetStateAction<SortMethodType>>;
}) => {
    return (
        <select
            className="select"
            onChange={(event) => {
                switch (event.target.value) {
                    case "CREATED_AT":
                        setSortMethod("CREATED_AT");
                        break;
                    case "PRICE_ASC":
                        setSortMethod("PRICE_ASC");
                        break;
                    case "PRICE_DESC":
                        setSortMethod("PRICE_DESC");
                        break;
                    default:
                        setSortMethod("NAME");
                }
            }}
        >
            <option value="NAME">Name</option>
            <option value="CREATED_AT">Created At</option>
            <option value="PRICE_ASC">Price Asc</option>
            <option value="PRICE_DESC">Price Desc</option>
        </select>
    );
};

export default SortProductSelect;
