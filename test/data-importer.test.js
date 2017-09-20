import 'chai/register-should';
import { removeUnecessaryProps } from "../src/data-importer";


describe('data-importer', function () {

  describe('removeUnecessaryProps', function () {
    it('strips the props out of an object', function () {

      const fullObj = {
        domain: "grnh.se",
        approved_at_utc: 23424245435,
        banned_by: "adsf",
        media_embed: {},
        thumbnail_width: 140,
        subreddit: "rubyjobs",
        selftext_html: null,
        selftext: "test-self-text",
        likes: 5,
        suggested_sort: false,
        user_reports: [],
        secure_media: null,
        link_flair_text: null,
        id: "6xcom9",
        title: "test-title",
        permalink: "test-permalink"
      };

      const expected = {
        id: "6xcom9",
        title: "test-title",
        permalink: "test-permalink",
        selftext: "test-self-text"
      };


      removeUnecessaryProps(fullObj).should.be.deep.equal(expected);
    });
  })

});
