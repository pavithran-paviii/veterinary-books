import React, { useContext, useEffect, useState } from "react";
import classNames from "./pets.module.scss";
import { useNavigate } from "react-router-dom";
import PetsForm from "../../components/PetsForm";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";
import { MdDeleteOutline } from "react-icons/md";
import { Toastify } from "../../components/Custom";

const Pets = () => {
  const navigate = useNavigate();
  const { email } = useContext(GlobalContext);

  //local states
  const [allPets, setAllPets] = useState([]);
  const [localRefresh, setLocalRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [localStep, setLocalStep] = useState("");

  //functions

  async function getAllPets() {
    try {
      let response = await axios.get(BACKENDURL + `/pet/${email}`);

      setAllPets(response?.data?.data);
    } catch (error) {
      console.log(error?.message, "Error while trying to fetch pets!");
    }
  }

  async function deletePet(petID) {
    try {
      let response = await axios.delete(BACKENDURL + `/pet/${petID}`);

      if (response?.data?.status) {
        setLocalRefresh((prev) => !prev);
        Toastify(response?.data?.message, "success");
      } else {
        Toastify(response?.data?.message, "error");
      }
    } catch (error) {
      Toastify(error?.message, "error");
      console.log(error?.message, "Error while deleting client!");
    }
  }

  useEffect(() => {
    getAllPets();
  }, [localRefresh]);

  return (
    <div className={classNames.client}>
      {localStep === "createPet" ? (
        <PetsForm
          setLocalStep={setLocalStep}
          setLocalRefresh={setLocalRefresh}
        />
      ) : (
        <>
          <div className={classNames.topBar}>
            <input
              type="text"
              className={classNames.searchOption}
              placeholder="Search pets..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event?.target?.value)}
            />
            <button
              className={classNames.addClient}
              onClick={() => {
                setLocalStep("createPet");
              }}
            >
              Add Pets
            </button>
          </div>
          <div
            className={classNames.tableContainer}
            style={{ display: allPets?.length > 0 ? "" : "none" }}
          >
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Type</th>
                  <th>Weight</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {allPets?.length > 0 &&
                  allPets
                    ?.filter((eachClient) => {
                      let searchText = searchQuery?.toLowerCase();
                      return (
                        eachClient?.email?.includes(searchText) ||
                        eachClient?.name?.includes(searchText)
                      );
                    })
                    .map((eachItem, index) => {
                      return (
                        <div>
                          <tr key={eachItem?.name + index}>
                            <td>{eachItem?.name}</td>
                            <td>{eachItem?.age}</td>
                            <td>{eachItem?.sex}</td>
                            <td>{eachItem?.type}</td>
                            <td>{eachItem?.weight}</td>
                            <td>
                              <MdDeleteOutline
                                onClick={() => deletePet(eachItem?._id)}
                              />
                            </td>
                          </tr>
                        </div>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Pets;
