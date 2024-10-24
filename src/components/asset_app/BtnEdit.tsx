"use client";

import { Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

type EditProps = {
  id: number;
};

export default function BtnEdit({ id }: EditProps) {
  return (
      <Link
        href={{
          pathname: `/habitActions/edit`,
          query: {
            id: id,
          },
        }}
      >
        <Button variant="outline" size="sm" className="mr-2">
          <Edit className="mr-1 size-4" /> Edit, id: {id}
        </Button>
      </Link>
  );
}
