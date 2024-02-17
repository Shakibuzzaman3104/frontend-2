import Modal from "./ui/Model";
import Field from "./ui/Field";
import { MovieSchema } from "@/utils";

import { Formik, Form } from "formik";
function AddEditModel({
  btnText = "Save",
  isOpen,
  onClose,
  onForm,
  InitialValues = {
    name: "",
    review: ""
  }
}) {
  const submitHandler = (values, helpers) => {
    // Generate random UUID
    onForm(values);
    helpers.resetForm({
      InitialValues
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={InitialValues}
        validationSchema={MovieSchema}
        onSubmit={submitHandler}>
        {({
          errors,
          isSubmitting,
          handleBlur,
          touched
        }) => (
          <Form className="">
            <Field
              id="name"
              name="name"
              type="text"
              errorText={errors.name}
              error={touched.name}
              onBlur={handleBlur}
              placeholder="Enter movie title"
              containerClass="w-full  mb-5"
            />
            <Field
              id="review"
              name="review"
              type="text"
              errorText={errors.review}
              error={touched.review}
              onBlur={handleBlur}
              placeholder="Write a review"
              containerClass="w-full  mb-5"
            />
            <div className="space-x-10 !mt-12 text-center">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 rounded text-white px-5 py-2 text-base sm:text-lg font-semibold">
                {isSubmitting ? "Submitting..." : btnText}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-orange-700 hover:bg-orange-600 rounded text-white px-5 py-2 text-base sm:text-lg font-semibold">
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default AddEditModel;
