'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Search from '@components/Search';

const SearchPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);

  const createList = async (list) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/list/new', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          name: list.name,
          responseCodes: list.responseCodes,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Search onSave={createList} submitting={submitting} />
    </div>
  );
};

export default SearchPage;
