import DashboardWrapper from "@/components/DashboardWrapper/DashboardWrapper";
import { RocketContextProvider } from "@/components/RocketEditor/RocketContext";

interface RocketEditProps {
    params: {
        rocketId: string;
    };
}

const page = ({ params }: RocketEditProps) => {
    const { rocketId } = params;

    return (
        <RocketContextProvider rocketId={rocketId}>
            <DashboardWrapper rocketId={rocketId} />
        </RocketContextProvider>
    );
};

export default page;
