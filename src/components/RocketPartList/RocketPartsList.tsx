import { RocketPartPrototypes, PartTypes } from "@/config/rocket_parts";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import PrototypePartCard from "./PrototypePartCard";

const RocketPartsList = () => {
    return (
        <Accordion type="single" collapsible>
            {Object.values(PartTypes).map((key) => (
                <AccordionItem
                    key={`accord_${key.toString()}`}
                    value={`${key.toString()}`}
                >
                    <AccordionTrigger>{key}</AccordionTrigger>
                    <AccordionContent>
                        {RocketPartPrototypes.filter(
                            (partCat) =>
                                partCat.part_type === key &&
                                partCat.image !== ""
                        ).map((part) => (
                            <PrototypePartCard
                                key={`part:_${key.toString()}_${part.name}`}
                                part={{ name: part.name, image: part.image }}
                            />
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default RocketPartsList;
