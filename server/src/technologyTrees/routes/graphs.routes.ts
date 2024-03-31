import { Router } from 'express'
import {
  traversalUpToRoot
} from '../controllers/graphs.controller'
import { physicsTree } from '../mocks/physicsInvestigations'

const router = Router()

// Route that shows a traversal up to root list of each node of the given tree. It also accepts the starter node of the tree.
export const lookGraphs = router.get(
  `/private-api-001/look-graphs`,
  async (_req, res) => {
    const result = Array.from(traversalUpToRoot(physicsTree, 2))
    

    res.json({
      error: { name: null, message: null },
      message: 'Dependencies obtained.',
      data: result
    })
  }
)
