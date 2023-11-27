import { Button } from "components/button";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import styled from "styled-components";

const CategoryManageStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CategoryManage = () => {
  return (
    <CategoryManageStyles>
      <DashboardHeading
        title="Categories"
        desc="Manage your category"
      ></DashboardHeading>
      <Button kind="ghost" to="/manage/add-category">
        Create category
      </Button>
      <div>
        <Table>
          <thead>
            <th>
              <td>ID</td>
              <td>Name</td>
              <td>Slug</td>
              <td>Status</td>
              <td>Action</td>
            </th>
          </thead>
        </Table>
      </div>
    </CategoryManageStyles>
  );
};

export default CategoryManage;
