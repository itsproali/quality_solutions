import React from "react";
import ServiceDetails from "../../src/Main/ServiceDetails/ServiceDetails";
import { BASE_URL } from "../../src/services/AxiosCommon";
import { IService } from "../../src/Interfaces/Service.interface";

const ServicesPage = ({ data }) => {
  return <ServiceDetails data={data} />;
};

export default ServicesPage;

export async function getStaticProps(context) {
  const res = await fetch(`${BASE_URL}/api/v1/service/${context.params.id}`);
  const service = await res.json();

  return {
    props: {
      data: service.result,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${BASE_URL}/api/v1/service`);
  const services = await res.json();
  const paths = services.result.data.map((service: IService) => ({
    params: { id: service._id },
  }));
  return { paths, fallback: "blocking" };
}

// export const getServerSideProps = async (ctx) => {
//   const { id } = ctx.params;
//   const res = await fetch(`${BASE_URL}/api/v1/service/${id}`);
//   const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// };
