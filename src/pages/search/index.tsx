import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import { useRouter } from 'next/router'
import React from 'react'
import { FaFilter } from "react-icons/fa"
import { AiFillStar } from "react-icons/ai"
import Footer from '@/components/Footer'

const Search = () => {
  const router = useRouter()

  return (
    <>
      <Navbar />
      <div className='py-8'>
        <div className='max-w-7xl mx-auto flex px-5 lg:px-0'>
          <div className='pr-10 text-sm w-[15%]'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-x-2'>
                <FaFilter />
                <p>Filter</p>
              </div>
              <div>
                <p className='text-xs text-red-500'>Clear</p>
              </div>
            </div>
            <div className='mt-5 flex flex-col gap-y-4'>
              <div className='flex flex-col gap-y-2'>
                <p className='font-bold'>Location</p>
                <div className='flex flex-col gap-y-2'>
                  <div className='flex gap-x-2 items-center'>
                    <input type="checkbox" name="" id="" className='rounded' />
                    <p>DKI Jakarta</p>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <input type="checkbox" name="" id="" className='rounded' />
                    <p>Bekasi Selatan</p>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <input type="checkbox" name="" id="" className='rounded' />
                    <p>Tangerang</p>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <input type="checkbox" name="" id="" className='rounded' />
                    <p>Bandung</p>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <input type="checkbox" name="" id="" className='rounded' />
                    <p>Bogor</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-y-2'>
                <p className='font-bold'>Price</p>
                <div className='flex flex-col gap-y-2'>
                  <div>
                    <p>Minimum</p>
                    <div className='relative flex'>
                      <div className='absolute bg-[#F3F4F5] h-full p-2 rounded-tl-md rounded-bl-md flex items-center'>
                        <span>Rp</span>
                      </div>
                      <input type="text" name="" id="" className='w-full focus:border-none border border-[#F3F4F5] rounded-md text-sm pl-10' />
                    </div>
                  </div>
                  <div>
                    <p>Maximum</p>
                    <div className='relative flex'>
                      <div className='absolute bg-[#F3F4F5] h-full p-2 rounded-tl-md rounded-bl-md flex items-center'>
                        <span>Rp</span>
                      </div>
                      <input type="text" name="" id="" className='w-full focus:border-none border border-[#F3F4F5] rounded-md text-sm pl-10' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-y-2'>
                <p className='font-bold'>Rating</p>
                <div className='flex flex-col gap-y-2'>
                  <div className='flex gap-x-2 items-center'>
                    <input type="checkbox" name="" id="" className='rounded' />
                    <p className='flex items-center gap-x-1'><span><AiFillStar color={"orange"} size={15} /></span>4 above</p>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <input type="checkbox" name="" id="" className='rounded' />
                    <p className='flex items-center gap-x-1'><span><AiFillStar color={"orange"} size={15} /></span>3 above</p>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <input type="checkbox" name="" id="" className='rounded' />
                    <p className='flex items-center gap-x-1'><span><AiFillStar color={"orange"} size={15} /></span>2 above</p>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <input type="checkbox" name="" id="" className='rounded' />
                    <p className='flex items-center gap-x-1'><span><AiFillStar color={"orange"} size={15} /></span>1 above</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-y-2'>
                <p className='font-bold'>Category</p>
                <div className='flex flex-col gap-y-2'>
                  <div className='flex gap-x-2 items-center'>
                    <input type="checkbox" name="" id="" className='rounded' />
                    <p>Handphone</p>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <input type="checkbox" name="" id="" className='rounded' />
                    <p>Casing</p>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <input type="checkbox" name="" id="" className='rounded' />
                    <p>Accessories</p>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <input type="checkbox" name="" id="" className='rounded' />
                    <p>Charger</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-1'>
            <div className='flex justify-between items-center'>
              <p>Product search result for &quot;<span className='font-bold'>{router.query.q}</span>&quot;</p>
              <div className='flex gap-x-5'>
                <div className='flex items-center gap-x-2'>
                  <p className='text-sm'>Sort: </p>
                  <select name="sort" id="sort" className='rounded-md border-slate-500 text-sm py-1'>
                    <option value="recommended">Recommended</option>
                    <option value="newest">Newest</option>
                    <option value="most_buy">Most buy</option>
                    <option value="price">Price</option>
                  </select>
                </div>
                <div className='flex items-center gap-x-2'>
                  <p className='text-sm'>Order: </p>
                  <select name="sort" id="sort" className='rounded-md border-slate-500 text-sm py-1'>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5'>
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
              <ProductCard
                showStar={true}
                image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={20000}
                order={3000}
                title="Sun Flower flower flower flower flower flower"
                place="Malang"
                star={5}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Search