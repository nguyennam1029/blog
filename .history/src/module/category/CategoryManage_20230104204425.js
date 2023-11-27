import { async } from "@firebase/util";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { categoryStatus } from "utils/constants";

const CategoryManageStyles = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
`;

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    async function getData() {
      const q = query(collection(db, "categories"));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
        setCategoryList(result);
      });
    }
    getData();
  }, [categoryList]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "categories", id));
  };
  console.log(categoryList);

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
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td className="italic text-gray-400">{category.slug}</td>
                <td>
                  {Number(category.status) === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {Number(category.status) === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="danger">UnApproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex align-center gap-3">
                    <ActionView></ActionView>
                    <ActionEdit></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDelete(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </CategoryManageStyles>
  );
};

export default CategoryManage;
