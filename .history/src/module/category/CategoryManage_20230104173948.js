import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { collection, doc, onSnapshot } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const CategoryManageStyles = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
`;

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    // const colref = collection(db, 'categories')
    const unsub = onSnapshot(doc(db, "categories"), (doc) => {
      console.log("Current data: ", doc.data());
    });
  }, []);
  return (
    <CategoryManageStyles>
      <div className="flex align-center justify-between">
        <DashboardHeading
          title="Categories"
          desc="Manage your category"
        ></DashboardHeading>
        <Button kind="ghost" to="/manage/add-category" className="ml-auto">
          Create category
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>BackEnd</td>
            <td className="italic text-gray-400">back-end</td>
            <td>Approved</td>
            <td>
              <div className="flex align-center gap-3">
                <ActionView></ActionView>
                <ActionEdit></ActionEdit>
                <ActionDelete></ActionDelete>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </CategoryManageStyles>
  );
};

export default CategoryManage;
