import { useState } from 'react'
import css from './App.module.css'
import CafeInfo from '../CafeInfo/CafeInfo.tsx'
import type { Votes ,VoteType } from '../../types/votes.ts'
import VoteOptions from '../VoteOptions/VoteOptions.tsx'
import VoteStats from '../VoteStats/VoteStats.tsx'
import Notification from '../Notification/Notification.tsx'

function App() {
  const initialVotes: Votes = {
    good: 0,
    neutral: 0,
    bad: 0
  }
  const [votes, setVotes] = useState<Votes>(initialVotes);

  function handleVote(type: VoteType) {
    setVotes({
      ...votes,
      [type]: votes[type] + 1
    })
  }

  function resetVotes() {
    setVotes(initialVotes)
  }

  const totalVotes:number = votes.good + votes.neutral + votes.bad;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0

  return (
    <>
      <div className={css.app}>
        <CafeInfo></CafeInfo>
        <VoteOptions
          onVote={handleVote}
          onReset={resetVotes}
          canReset={totalVotes ? true : false}>
        </VoteOptions>

        {totalVotes > 0 ? (
          <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}>
        </VoteStats>
        ) : (
          <Notification></Notification>
        )}
      </div>
    </>
  )
}

export default App
