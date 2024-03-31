import { TechnologyGraph } from '../../types'

// I've chosen to work with an unidirectional graphs in the technology tree data. It ensures me that I can handle this as a real tree from up to bottom, being the bottomness the childest.
export const traversalUpToRoot = (
  graph: TechnologyGraph,
  startNode: number,
  visited: Set<number> = new Set()
): Set<number> => {
  if (!visited.has(startNode)) {
    visited.add(startNode)
    const currentTech = graph[startNode]
    for (const prereq of currentTech.prerequisites) {
      traversalUpToRoot(graph, prereq, visited)
    }
  }
  return visited
}

// As I will get an array from the database when I'll query the trees, I must transform it into a graph structure.
export const convertArrayToGraph = (array: any[]): TechnologyGraph => {
  const techGraph: TechnologyGraph = {}

  array.forEach((tech: any, idx: number) => {
    techGraph[idx] = tech
  })

  return techGraph
  
}
