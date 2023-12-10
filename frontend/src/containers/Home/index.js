import React, { useRef } from 'react'

import { HeaderLayout } from "../../components/HeaderLayout";
import { BodyLayout } from "../../components/BodyLayout";
// import { FooterLayout } from "../../components/FooterLayout";

const Home = () => {
  const mapRef = useRef(undefined);

  return (
    <>
      <HeaderLayout />

      <BodyLayout mapRef={mapRef} />

      {/* <FooterLayout /> */}

    </>


  )
}

export default Home