import React, {useContext, createContext} from "react";

import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react';
import {ethers} from 'ethers';

const StateContext = createContext();
export const StateContextProvider =({children})=>{
    const {contract} = useContract('0x8316Ad08bd4921C7BE6465aF54c7b05E0796220A');
    const {mutateAsync : createCampaign} =useContractWrite(contract, 'createCampaign');
        const address = useAddress();
        const connect = useMetamask();

        const publishCampaign = async(form)=>{
            try {
                const data = await createCampaign([
                    address, //owner
                    form.title, //title
                    form.description, // description
                    form.target, //target
                    new Date(form.deadline).getTime(), //deadline
                    form.image
                ])
                console.log("Contract Call Success", data);
            } catch (error) {
                console.log("Contract Call Failure", error);
            }

        }

    return (
        <StateContext.Provider
         value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
         }}
        >
            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = ()=> useContext(StateContext);