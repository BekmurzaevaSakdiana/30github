'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CategoryUtils } from '../requests/categoryReq'; // Импортируйте класс CategoryUtils
import { Category } from '@/types/modules';

interface ModalCatalogProps {
  setOpenModalCatalog: (open: boolean) => void;
}

const ModalCatalog: React.FC<ModalCatalogProps> = ({ setOpenModalCatalog }) => {
  const SelectRef = useRef<HTMLDivElement | null>(null);
  
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        SelectRef.current &&
        !SelectRef.current.contains(target) &&
        !(target as HTMLElement).closest('.catalog-trigger')
      ) {
        setOpenModalCatalog(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpenModalCatalog]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      const data = await CategoryUtils.getCategory();
      if (data) {
        setCategories(data.results);
      } else {
        setError('Не удалось загрузить категории.');
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <div
      ref={SelectRef}
      className="container transition-all duration-[.5s] delay-1000"
    >
      <div className="max-w-[317px] my-animation w-full border px-9 py-12 absolute bg-bgPink transition-all duration-500 z-40">
        <nav>
          <ul className="flex flex-col  text-start gap-3">
            {loading && <p className="text-gray-500">Загрузка категорий...</p>}
            {error && <p className="text-red-500">Ошибка: {error}</p>}
            {!loading && !error && categories ? (
              categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/catalog/${category.id}?name=${category.name}`}
                    className="cursor-pointer text-maHalfBlack font-medium text-lg hover:text-white transition-all duration-200 linear"
                  >
                    {category.name}
                  </Link>
                  <hr className="max-w-full w-full text-black" />
                </li>
              ))
            ) : (
              !loading && !error && <p className="text-gray-500">Нет доступных категорий</p>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ModalCatalog;
