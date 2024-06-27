import { insertPlace } from "@/util/database";
import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    console.log("Place object received in createPlaceHandler:", place);
    await insertPlace(place);
    navigation.navigate("AllPlaces", { place: place });
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
