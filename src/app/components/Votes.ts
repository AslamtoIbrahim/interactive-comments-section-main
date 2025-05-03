type VoteReply = {
    id: number,
    vote: string,
}

type VoteComment = {
    id: number,
    vote: string,
    votesForRplies: VoteReply[],
}

const listVotes : {
    votesForComments: VoteComment[];
} = {
    votesForComments: []
}

export default listVotes;