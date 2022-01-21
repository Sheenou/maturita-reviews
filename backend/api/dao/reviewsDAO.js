let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) return;

        try {
            reviews = await conn.db(process.env.REVIEWS_COLL).collection("reviews");
        } catch (e) {
            
        }
    }
}