import ReviewsDAO from "../dao/reviewsDAO.js";


class ReviewsController {
    static async apiGetReviews(req, res, next) {
        let filters = {};
        const page = req.query.page ? req.parseInt(req.query.page, 10) : 0;
        const reviewsPerPage = req.query.reviewsPerPage ? parseInt(req.query.reviewsPerPage, 10) : 20;
    
        if (req.query.search) {
            filters.search = req.query.search;
        } else if (req.query.type) {
            filters.type = req.query.type;
        }

        const { reviewsList, totalNumReviews } = await ReviewsDAO.getReviews({
            filters,
            page,
            reviewsPerPage
        });

        let response = {
            reviews: reviewsList,
            page,
            filters,
            entries_per_page: reviewsPerPage,
            total_results: totalNumReviews
        };

        res.json(response);
    }
};

export default ReviewsController;