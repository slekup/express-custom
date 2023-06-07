"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorHandling = void 0;
const mongoose_1 = require("mongoose");
const index_1 = require("@utils/index");
/**
 * Handles a function.
 * @param controller The handler function.
 * @param req The request.
 * @param res The response.
 * @param next The next function.
 */
const handledFunction = async (controller, req, res, next) => {
    const session = await (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        await controller(req, res, session);
        await session.commitTransaction();
        next();
    }
    catch (error) {
        await session.abortTransaction();
        index_1.logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        session.endSession();
    }
};
/**
 * Wraps a handler function in error handling.
 * @param controller The handler function.
 * @returns The handler function wrapped in error handling.
 */
const withErrorHandling = (controller) => (req, res, next) => {
    handledFunction(controller, req, res, next);
};
exports.withErrorHandling = withErrorHandling;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL21pZGRsZXdhcmUvd3JhcHBlci5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUF1RDtBQUV2RCx3Q0FBc0M7QUFRdEM7Ozs7OztHQU1HO0FBQ0gsTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUMzQixVQUEwQixFQUMxQixHQUFZLEVBQ1osR0FBYSxFQUNiLElBQWtCLEVBQ0gsRUFBRTtJQUNqQixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUEsdUJBQVksR0FBRSxDQUFDO0lBRXJDLElBQUk7UUFDRixPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMzQixNQUFNLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDbEMsSUFBSSxFQUFFLENBQUM7S0FDUjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsTUFBTSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxjQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQztLQUMxRDtZQUFTO1FBQ1IsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNJLE1BQU0saUJBQWlCLEdBQzVCLENBQUMsVUFBMEIsRUFBRSxFQUFFLENBQy9CLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFRLEVBQUU7SUFDeEQsZUFBZSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzlDLENBQUMsQ0FBQztBQUpTLFFBQUEsaUJBQWlCLHFCQUkxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IENsaWVudFNlc3Npb24sIHN0YXJ0U2Vzc2lvbiB9IGZyb20gJ21vbmdvb3NlJztcblxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnQHV0aWxzL2luZGV4JztcblxudHlwZSBDb250cm9sbGVyVHlwZSA9IChcbiAgcmVxOiBSZXF1ZXN0LFxuICByZXM6IFJlc3BvbnNlLFxuICBzZXNzaW9uOiBDbGllbnRTZXNzaW9uXG4pID0+IFByb21pc2U8dW5rbm93bj4gfCB1bmtub3duO1xuXG4vKipcbiAqIEhhbmRsZXMgYSBmdW5jdGlvbi5cbiAqIEBwYXJhbSBjb250cm9sbGVyIFRoZSBoYW5kbGVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHJlcSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSByZXMgVGhlIHJlc3BvbnNlLlxuICogQHBhcmFtIG5leHQgVGhlIG5leHQgZnVuY3Rpb24uXG4gKi9cbmNvbnN0IGhhbmRsZWRGdW5jdGlvbiA9IGFzeW5jIChcbiAgY29udHJvbGxlcjogQ29udHJvbGxlclR5cGUsXG4gIHJlcTogUmVxdWVzdCxcbiAgcmVzOiBSZXNwb25zZSxcbiAgbmV4dDogTmV4dEZ1bmN0aW9uXG4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IHN0YXJ0U2Vzc2lvbigpO1xuXG4gIHRyeSB7XG4gICAgc2Vzc2lvbi5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgYXdhaXQgY29udHJvbGxlcihyZXEsIHJlcywgc2Vzc2lvbik7XG4gICAgYXdhaXQgc2Vzc2lvbi5jb21taXRUcmFuc2FjdGlvbigpO1xuICAgIG5leHQoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBhd2FpdCBzZXNzaW9uLmFib3J0VHJhbnNhY3Rpb24oKTtcbiAgICBsb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InIH0pO1xuICB9IGZpbmFsbHkge1xuICAgIHNlc3Npb24uZW5kU2Vzc2lvbigpO1xuICB9XG59O1xuXG4vKipcbiAqIFdyYXBzIGEgaGFuZGxlciBmdW5jdGlvbiBpbiBlcnJvciBoYW5kbGluZy5cbiAqIEBwYXJhbSBjb250cm9sbGVyIFRoZSBoYW5kbGVyIGZ1bmN0aW9uLlxuICogQHJldHVybnMgVGhlIGhhbmRsZXIgZnVuY3Rpb24gd3JhcHBlZCBpbiBlcnJvciBoYW5kbGluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdpdGhFcnJvckhhbmRsaW5nID1cbiAgKGNvbnRyb2xsZXI6IENvbnRyb2xsZXJUeXBlKSA9PlxuICAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pOiB2b2lkID0+IHtcbiAgICBoYW5kbGVkRnVuY3Rpb24oY29udHJvbGxlciwgcmVxLCByZXMsIG5leHQpO1xuICB9O1xuIl19