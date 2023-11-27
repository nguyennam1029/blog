import { Button } from "components/button";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";

const CategoryManage = () => {
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" to="manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
      <a href="#"> vcl</a>
    </div>
  );
};

export default CategoryManage;
