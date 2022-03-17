import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  useBreakpointValue,
  Spinner
} from '@chakra-ui/react'
import useSWR from 'swr'
import { useEffect, useState } from 'react'

import { Layout } from '../src/components'
import { fetcher } from '../src/utils/api'

export default function Home() {
  const { data: voteData } = useSWR(`api/votes`, fetcher)
  const [votes, setVotes] = useState([])
  const gridColumVariant = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    md: 'repeat(2, 1fr)',
  })
  const cardWidthVariant = useBreakpointValue({ base: '18ch', md: '24ch' })

  useEffect(() => {
    if (voteData) {
      setVotes(voteData)
    }
  }, [voteData])

  const girlVotes = votes.filter((r) => r.gender === 'girl') || []
  const boyVotes = votes.filter((r) => r.gender === 'boy') || []

  const voteRenderer = (vote, type) => {
    const listItemStyles = {
      backgroundColor: type == 'girl' ? 'purple.200' : 'cyan.600',
      borderRadius: '8px',
      boxShadow: 'xl',
      padding: '0.25em',
      margin: '0.5em',
      color: type === 'girl' ? 'purple.800' : 'cyan.800',
      minHeight: '8ch',
      width: cardWidthVariant,
    }

    return (
      <GridItem key={vote.id} {...listItemStyles}>
        <Text
          fontSize="xl"
          color={type === 'girl' ? 'purple.600' : 'cyan.100'}
          textAlign="center"
        >
          {type === 'boy' ? '♂️' : '♀️'}&nbsp;{vote.name}&nbsp;voted for {type}
        </Text>
      </GridItem>
    )
  }

  return (
    <Layout title="👶 🍼 Votes" id="results-list">
      <Box display="flex" flexDirection="row">
        <Box as="section" margin="0.25em" width="50%">
          <Heading as="h2" color="cyan.400">
            Boy Votes
          </Heading>
          <Text fontSize="lg">Count: {boyVotes.length}</Text>
          {boyVotes.length === 0 ? (<Spinner />) : null}
          <Grid templateColumns={gridColumVariant}>
            {boyVotes.map((vote) => voteRenderer(vote, 'boy'))}
          </Grid>
        </Box>
        <Box as="section" margin="0.25em" width="50%">
          <Heading as="h2" color="purple.500">
            Girl Votes
          </Heading>
          <Text fontSize="lg">Count: {girlVotes.length}</Text>
          {girlVotes.length === 0 ? (<Spinner />) : null}
          <Grid templateColumns={gridColumVariant}>
            {girlVotes.map((vote) => voteRenderer(vote, 'girl'))}
          </Grid>
        </Box>
      </Box>
    </Layout>
  )
}
