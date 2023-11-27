import { async } from "@firebase/util";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { lowerCase } from "lodash";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Please enter your category"),
});
const CategoryAddNew = () => {
  const {
    control,
    setValue,
    reset,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),

    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
  });
  const watchStatus = watch("status");
  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    console.log(isValid);
    const cloneValues = { ...values };

    cloneValues.slug = slugify(values.slug || values.name, {
      lower: true,
    });
    try {
      await addDoc(collection(db, "categories"), {
        ...cloneValues,
        timestamp: serverTimestamp(),
      });
      toast.success("Created new category successfully");
    } catch (error) {
      toast.error("created new category failed");
    }
  };
  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        delay: 0,
      });
    }
  }, [errors]);
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto max-w[200px]"
          type="submit"
          isLoading={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
