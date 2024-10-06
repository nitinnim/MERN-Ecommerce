import React from 'react'
import { Button } from '../ui/button'
// import IconBtn from './IconBtn'

const AlertDialogDemo = ({modalData}) => {
  // console.log("modalData - ", modalData)
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-gray-200 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <Button
            onClick={modalData?.btn1Handler}
          >
            {modalData?.btn1text}
          </Button>
          <button
            className="cursor-pointer rounded-md bg-red-400 py-[8px] px-[20px] font-semibold text-richblack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlertDialogDemo
