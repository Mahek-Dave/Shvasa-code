import { API_URL } from "./config";
import { AJAX } from "./helper";

/**
 * Final payload 
////////////////
 const payload = {
  name,
  email,
  phone,
  age,
  gender,
  weight,
  onboardingData,
  medicalCondition,
  marketingData,
};
//////////////////
 */

const payload = {
  name: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  weight: {
    unit: "",
    value: "",
  },
  onboardingData: {},
  medicalCondition: {},
  marketingData: {},
};

export const loadFreeTrialData = async function (packageId) {
  console.log("loaded model");
  const data = AJAX(`${API_URL}/api/package/data/${packageId}`);
  console.log(data);
};
