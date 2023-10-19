import { RocketPartPrototypes, PartTypes } from "@/config/rocket_parts";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

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
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default RocketPartsList;
