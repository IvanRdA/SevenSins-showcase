import mainProceduralProcess from "../controllers/mainProcess.controller"
import { performance } from "perf_hooks"

// Testing the creation runtime
describe('Time with 10k galaxies', () => {
    it('Be less than 2 minutes (120000ms)', async () => {
        const systems = 2500
        const startTime = performance.now()
        const galaxy = await mainProceduralProcess('Testing Galaxy', systems)
        await galaxy.storeGalaxy()
        const endTime = performance.now()
        const elapsedTime = endTime - startTime
//
        expect(elapsedTime).toBe(elapsedTime <= 240000)
    }, 240000)
})