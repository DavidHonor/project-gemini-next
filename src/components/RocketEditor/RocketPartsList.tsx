import { RocketPartPrototypes, PartTypes } from "@/config/rocket_parts";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

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
                            (partCat) => partCat.part_type === key
                        ).map((part) => (
                            <div className="flex flex-row">
                                <Image
                                    alt={key}
                                    width={100}
                                    height={100}
                                    src={`/rocket_parts/${part.image}`}
                                />
                                {part.name}
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default RocketPartsList;
