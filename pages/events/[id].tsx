import { IEvent } from "../../src/Interfaces/Event.interface";
import EventDetails from "../../src/Main/Events/EventDetails";
import { SEO } from "../../src/components/Reused/Seo/Seo";
import { BASE_URL } from "../../src/services/AxiosCommon";

interface IProps {
  eventData: IEvent;
}

export default function EventDetailsPage({ eventData }: IProps) {
  return (
    <>
      <SEO
        title={`${eventData?.title} | One Quality Solutions` || "Events"}
        description={eventData?.description}
        image={eventData?.image}
      />

      <EventDetails singleData={eventData} />
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${BASE_URL}/api/v1/event`);
  const events = await res.json();
  const paths = events.results.map((event: IEvent) => ({
    params: { id: event._id },
  }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  const res = await fetch(`${BASE_URL}/api/v1/event/${context.params.id}`);
  const event: IEvent = await res.json();
  return {
    props: {
      eventData: event,
    },
    revalidate: 10,
  };
}
