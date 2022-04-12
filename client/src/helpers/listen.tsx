import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { UNI_TOKEN_ADDRESS } from "./constants";
//@ts-ignore
import UniToken from "../abis/UniToken.json";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const listen = (contract: ethers.Contract, navigate: any) => {
  contract.on(
    "ItemListedSuccessfully",
    (listingId: number, tokenId: number, price: number) => {
      showNotification({
        title: `Token Id ${tokenId} listed successfully!`,
        message: `Price: ${ethers.utils.parseEther(
          price.toString()
        )} Listing Id: ${listingId}`,
        color: "green",
      });
      navigate("/account");
    }
  );

  contract.on("ItemBought", (seller: string, name: string, price: number) => {
    showNotification({
      title: `${name} bought successfully!`,
      message: `Price: ${ethers.utils.parseEther(
        price.toString()
      )} Seller: ${seller}`,
      color: "green",
    });
    navigate("/account");
  });

  contract.on("Minted", (tokenId: number, name: string, createdAt: string) => {
    showNotification({
      title: `${name} minted successfully!`,
      message: `Created at: ${dayjs(createdAt).format("LLL")}.`,
    });
    navigate("/account");
  });
};

export default listen;
