import * as Yup from "yup";
export const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  




export const MovieSchema = Yup.object().shape({
    name: Yup.string().required("Name is a required field"),
    review: Yup.string().required("Review is a required field"),
 
});
