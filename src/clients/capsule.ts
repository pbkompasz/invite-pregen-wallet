import Capsule, { Environment } from "@usecapsule/react-sdk";

const capsule = new Capsule(
  Environment.BETA,
  process.env.NEXT_PUBLIC_CAPSULE_API_KEY,
);

export default capsule;
