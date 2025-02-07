import { getAnimals } from "../controllers/index.controllers.js";

/**
 * @swagger
 * /api/animals:
 *   get:
 *     tags:
 *       - animals
 *     summary: Get catalog of pets
 *     description: Returns a list of pets with pagination and optional species filter.
 *     parameters:
 *       - name: x-api-key
 *         in: header
 *         description: API key for authorization
 *         required: true
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: Page number (minimum 1)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *       - name: limit
 *         in: query
 *         description: Number of items per page (minimum 10)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 10
 *       - name: species
 *         in: query
 *         description: Filter by species name
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: A list of pets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Oyen
 *                       location:
 *                         type: string
 *                         example: Garut
 *                       favoriteCount:
 *                         type: integer
 *                         example: 100
 *                       petPhotos:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "https://example.com/image.jpg"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2021-08-01T12:00:00Z
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                     perPage:
 *                       type: integer
 *                       example: 10
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                 links:
 *                   type: object
 *                   properties:
 *                     first:
 *                       type: string
 *                       example: "/api/animals?page=1"
 *                     last:
 *                       type: string
 *                       example: "/api/animals?page=10"
 *                     prev:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     next:
 *                       type: string
 *                       example: "/api/animals?page=2"
 *       "400":
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request parameters
 *       "403":
 *         description: "Forbidden: Invalid API key"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden: Invalid API key"
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
export const route = (app) => {
  app.get("/api/animals", getAnimals);
};
