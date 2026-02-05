import toast from "react-hot-toast";

const showJoiErrorsSequentially = (errors) => {
  errors.forEach((e, index) => {
    setTimeout(() => {
      toast.error(`${e.field.toUpperCase()}: ${e.message}`);
    }, index * 1000); // 1.2s gap
  });
};

export default showJoiErrorsSequentially;