"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdateList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listId = searchParams.get("id");

  const [list, setList] = useState({ name: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getListDetails = async () => {
      const response = await fetch(`/api/list/${listId}`);
      if (response.ok) {
        const data = await response.json();
        setList({ name: data.name });
      } else {
        console.error("Failed to fetch list details");
      }
    };

    if (listId) getListDetails();
  }, [listId]);

  const updateList = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!listId) return alert("Missing ListId!");

    try {
      const response = await fetch(`/api/list/${listId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: list.name,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      list={list}
      setList={setList}
      submitting={submitting}
      handleSubmit={updateList}
    />
  );
};

export default UpdateList;
