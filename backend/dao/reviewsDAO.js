let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) return;

        try {
            reviews = await conn.db(process.env.MAIN_DB_NAME).collection("reviews");
        } catch (e) {
            console.error(`Unable to establish a collection handle in reviewsDAO: ${e}`);
        }
    }

    static async getReviews({
        filters = null,
        page = 0,
        reviewsPerPage = 20
    } = {}) {
        let query;

        if ("search" in filters) {
            query = {$text: { $search: filters["search"] } };
        } else if ("type" in filters) {
            query = {"type": { $eq: filters["type"]} };
        }

        let cursor;

        try {
            cursor = await reviews
            .find(query);
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { reviewsList: [], totalNumReviews: 0 };
        }

        const displayCursor = cursor.limit(reviewsPerPage).skip(page * reviewsPerPage);
        
        try {
            const reviewsList = await displayCursor.toArray();
            const totalNumReviews = await reviews.countDocuments();
            return { reviewsList, totalNumReviews };
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
            return { reviewsList: [], totalNumReviews: 0 };
        }
    }
}