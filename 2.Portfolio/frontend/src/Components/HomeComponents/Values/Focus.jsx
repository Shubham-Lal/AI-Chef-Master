import { Link } from "react-router-dom";
import { ChefCard1 } from "../Pocket/ChefCard1";
import { v4 as uuidv4 } from "uuid";
export default function Focus() {
  return (
    <>
      <ChefCard1
        key={uuidv4()}
        heading={"Focus on Research and Development"}
        description={
          "Our company thrives on a foundation of innovation, always striving to push the boundaries of technology to develop and enhance advanced features. We are driven by a dedicated team of experts who work at the forefront of industry trends, ensuring that we remain a leading force in the culinary tech sector. This relentless focus on innovation allows us to consistently deliver unparalleled value to our users, meeting and exceeding their evolving needs. Our leadership team is not only adept at steering the company toward success but is also deeply committed to fostering a culture of continuous improvement. They understand that the key to maintaining our position as industry leaders is to keep exploring new possibilities and implementing cutting-edge solutions.By staying ahead of the curve, we can offer our customers the latest in culinary technology, ensuring they have the best possible experience. We believe that the pursuit of innovation is a never-ending journey, and we are dedicated to keeping our company at the forefront by constantly refining our products and services. This commitment to excellence ensures that we continue to set the standard in the industry and remain a trusted name in culinary tech."
        }
        video={"assets/2.mp4"}
      ></ChefCard1>
    </>
  );
}
