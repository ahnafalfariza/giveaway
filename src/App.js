import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller'

import { contractGetGiveaway, contractGetParticipants, contractGetWinners } from './near/near';

import './App.css';

function App() {
  const [giveaway, setGiveaway] = useState(null)
  const [winners, setWinners] = useState(null)
  const [participants, setParticipants] = useState([])

  const [numParticipant, setNumParticipants] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    getGiveaway()
    getParticipants()
  }, [])

  const getGiveaway = async () => {
    const _giveaway = await contractGetGiveaway({
      id: "ga-03"
    })
    const _winners = await contractGetWinners({
      giveawayId: "ga-03",
      start: 0,
      end: _giveaway.winnersCount
    })

    setGiveaway(_giveaway)
    setWinners(_winners)
  }

  const getParticipants = async () => {
    const _participants = await contractGetParticipants({
      giveawayId: "ga-03",
      start: numParticipant,
      end: numParticipant + 10
    })

    if (_participants.length === 0) {
      setHasMore(false)
    } else {
      setParticipants([...participants, ..._participants])
      setNumParticipants(numParticipant + 10)
    }
  }

  return (
    <div
      className="min-h-screen relative bg-dark-primary-1 text-center App p-4 md:p-0 md:pb-4"
      style={{
        backgroundImage: `linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.69) 69%, rgba(0, 0, 0, 0) 100%)`,
      }}
    >
      <div className="m-auto max-w-2xl">
        <div className="py-4">
          <svg
            className="mx-auto"
            width="80"
            height="19"
            viewBox="0 0 80 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.8185 18.223L27.4999 17.0833C27.4018 17.1649 27.2956 17.2426 27.1812 17.3161C26.1355 18.0269 24.6813 18.3823 22.8185 18.3823C21.0538 18.3823 19.6486 18.0636 18.6029 17.4264C17.5571 16.7891 17.0342 15.6168 17.0342 13.9092C17.0342 12.3079 17.5653 11.1723 18.6274 10.5024C19.6976 9.83247 21.3561 9.4975 23.6028 9.4975H27.218V9.05633C27.218 8.10045 26.9647 7.41826 26.4582 7.00977C25.9517 6.59311 25.2736 6.38477 24.4239 6.38477C23.6559 6.38477 23.0023 6.5686 22.4631 6.93624C21.9239 7.30389 21.589 7.88803 21.4582 8.68868L17.3406 7.53673C17.5857 6.20504 18.3128 5.20831 19.522 4.54655C20.7393 3.88479 22.3079 3.5539 24.2278 3.5539C27.0056 3.5539 28.9051 4.12988 29.9263 5.28184C30.9476 6.43379 31.4582 8.07186 31.4582 10.196V18.223H27.8185ZM27.218 13.897V11.9852H24.4852C23.276 11.9852 22.4468 12.1364 21.9974 12.4387C21.5563 12.741 21.3357 13.2107 21.3357 13.848C21.3357 14.4771 21.5358 14.9509 21.9362 15.2695C22.3365 15.58 22.9778 15.7352 23.8602 15.7352C24.8324 15.7352 25.633 15.5514 26.2621 15.1838C26.8994 14.8161 27.218 14.3872 27.218 13.897Z"
              fill="white"
            />
            <path
              d="M43.0744 10.8823C43.0744 9.06041 42.8661 7.87169 42.4494 7.31614C42.0409 6.75242 41.4691 6.47056 40.7338 6.47056C39.8841 6.47056 39.206 6.76876 38.6995 7.36516C38.2746 7.87169 38.0295 8.43542 37.9642 9.05633V18.223H33.7485V3.68871H37.7803L37.8661 5.08576C37.907 5.04491 37.9478 5.00815 37.9887 4.97547C39.0916 4.03593 40.5377 3.56616 42.3269 3.56616C44.2632 3.56616 45.5744 4.16256 46.2607 5.35537C46.947 6.54 47.2901 8.38231 47.2901 10.8823H43.0744Z"
              fill="white"
            />
            <path
              d="M59.9157 18.223L59.597 17.0833C59.499 17.1649 59.3928 17.2426 59.2784 17.3161C58.2327 18.0269 56.7784 18.3823 54.9157 18.3823C53.151 18.3823 51.7458 18.0636 50.7 17.4264C49.6543 16.7891 49.1314 15.6168 49.1314 13.9092C49.1314 12.3079 49.6624 11.1723 50.7245 10.5024C51.7948 9.83247 53.4533 9.4975 55.7 9.4975H59.3152V9.05633C59.3152 8.10045 59.0619 7.41826 58.5554 7.00977C58.0488 6.59311 57.3707 6.38477 56.5211 6.38477C55.7531 6.38477 55.0995 6.5686 54.5603 6.93624C54.0211 7.30389 53.6861 7.88803 53.5554 8.68868L49.4378 7.53673C49.6829 6.20504 50.41 5.20831 51.6191 4.54655C52.8364 3.88479 54.4051 3.5539 56.325 3.5539C59.1028 3.5539 61.0023 4.12988 62.0235 5.28184C63.0447 6.43379 63.5553 8.07186 63.5553 10.196V18.223H59.9157ZM59.3152 13.897V11.9852H56.5823C55.3732 11.9852 54.5439 12.1364 54.0946 12.4387C53.6534 12.741 53.4328 13.2107 53.4328 13.848C53.4328 14.4771 53.633 14.9509 54.0333 15.2695C54.4337 15.58 55.075 15.7352 55.9573 15.7352C56.9296 15.7352 57.7302 15.5514 58.3593 15.1838C58.9965 14.8161 59.3152 14.3872 59.3152 13.897Z"
              fill="white"
            />
            <path
              d="M72.9902 18.3455C71.0131 18.3455 69.3914 18.0514 68.1251 17.4632C66.8587 16.8667 66.0376 15.8823 65.6618 14.5097L69.3628 13.1617C69.5262 14.0277 69.9347 14.6445 70.5883 15.0122C71.25 15.3717 72.0262 15.5514 72.9167 15.5514C73.8481 15.5514 74.567 15.4248 75.0736 15.1715C75.5801 14.9182 75.8334 14.5547 75.8334 14.0808C75.8334 13.4844 75.527 13.0963 74.9142 12.9166C74.3097 12.7287 73.317 12.5326 71.9363 12.3284C69.7059 12.0343 68.121 11.589 67.1814 10.9926C66.2419 10.3962 65.7721 9.3627 65.7721 7.89212C65.7721 6.38886 66.4176 5.29409 67.7084 4.60782C69.0074 3.92155 70.7231 3.57841 72.8554 3.57841C74.9224 3.57841 76.5074 3.87253 77.6103 4.46076C78.7214 5.04083 79.4445 5.98445 79.7794 7.29163L76.2133 8.61516C76.0417 7.83084 75.6618 7.25895 75.0736 6.89948C74.4935 6.53183 73.7296 6.34801 72.7819 6.34801C71.8832 6.34801 71.1806 6.4869 70.6741 6.76467C70.1757 7.04245 69.9265 7.40193 69.9265 7.8431C69.9265 8.41499 70.2492 8.77855 70.8947 8.93378C71.5482 9.08901 72.5327 9.26058 73.8481 9.44848C75.9886 9.72626 77.549 10.1715 78.5294 10.7843C79.5098 11.3888 80 12.4101 80 13.848C80 15.4738 79.3668 16.6298 78.1005 17.3161C76.8423 18.0024 75.1389 18.3455 72.9902 18.3455Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.45097 18.3823L0 0L10.3553 1.83823C10.7955 1.95407 11.2031 2.0472 11.5784 2.13296C12.9897 2.45543 13.9444 2.67359 14.4607 3.60292C15.1143 4.77122 15.4411 6.20912 15.4411 7.91663C15.4411 9.63231 15.1143 11.0743 14.4607 12.2426C13.8071 13.4109 12.4387 13.995 10.3553 13.995H5.87007L6.72791 18.3823H2.45097ZM3.799 3.799L9.3876 4.78089C9.62517 4.84277 9.84513 4.89252 10.0477 4.93832C10.8093 5.11057 11.3246 5.2271 11.6032 5.72351C11.9559 6.34755 12.1323 7.11561 12.1323 8.02767C12.1323 8.9441 11.9559 9.71434 11.6032 10.3384C11.2505 10.9624 10.5119 11.2745 9.3876 11.2745H6.8347L5.29625 11.1519L3.799 3.799Z"
              fill="white"
            />
          </svg>
        </div>
        {giveaway && participants && winners && (
          <>
            <div className="relative m-auto">
              <div className="flex justify-center mt-12">
                <h1 className="text-5xl font-bold mb-8">{giveaway.name} Giveaway</h1>
                <a
                  href="https://github.com/ParasHQ/giveaway-contract"
                  target="_blank"
                  className="table pb-2 text-gray-200 hover:text-white font-semibold border-b-2 cursor-pointer m-0"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-1"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.70421 9.70711L13.9971 3.41421V7H15.9971V0H8.9971V2H12.5829L6.28999 8.29289L7.70421 9.70711ZM15 14V10H13V14H2V3H6V1H2C0.89543 1 0 1.89543 0 3V14C0 15.1046 0.89543 16 2 16H13C14.1046 16 15 15.1046 15 14Z" fill="white"></path></svg>
                </a>
              </div>
            </div>
            <div className="flex m-auto space-x-4">
              <div className="flex-1 border-2 border-gray-800 border-dashed rounded-md p-4">
                <h2 className="text-lg">Start Date</h2>
                <h2 className="text-xl font-bold">{new Date(parseInt(giveaway.startDate)).toDateString()}</h2>
                <h2 className="text-xl font-bold">{new Date(parseInt(giveaway.startDate)).toLocaleTimeString()}</h2>
              </div>
              <div className="flex-1 border-2 border-gray-800 border-dashed rounded-md p-4">
                <h2 className="text-lg">End Date</h2>
                <h2 className="text-xl font-bold">{new Date(parseInt(giveaway.endDate)).toDateString()}</h2>
                <h2 className="text-xl font-bold">{new Date(parseInt(giveaway.endDate)).toLocaleTimeString()}</h2>
              </div>
            </div>
            {giveaway.date !== 0 && (
              <>
                <div className="mt-4 m-auto border-2 border-gray-800 border-dashed rounded-md px-4 py-6">
                  <h2 className="text-lg">Draw Date</h2>
                  <h2 className="text-2xl font-bold">{new Date(parseInt(giveaway.drawDate) / 10 ** 6).toDateString()}</h2>
                  <h2 className="text-2xl  font-bold">{new Date(parseInt(giveaway.drawDate) / 10 ** 6).toLocaleTimeString()}</h2>
                </div>
                <div className="m-auto mt-4 border-2 border-gray-800 border-dashed rounded-md p-6">
                  <h2 className="font-bold text-2xl mb-4">Winners</h2>
                  <div className="flex flex-wrap">
                    {winners.map(user => (
                      <h4 className="w-1/2 font-semibold text-lg">{user}</h4>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div className="m-auto mt-4 border-2 border-gray-800 border-dashed rounded-md p-6">
              <h2 className="font-bold text-2xl mb-4">Participants</h2>
              <InfiniteScroll
                loadMore={getParticipants}
                hasMore={hasMore}
              >
                <div className="flex flex-wrap">
                  {participants.map((user, idx) => (
                    <h4 className="w-1/4" key={idx}>{user}</h4>
                  )
                  )}
                </div>
              </InfiniteScroll>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
