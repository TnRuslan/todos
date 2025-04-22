import { model, Schema } from 'mongoose';

const postSchema = new Schema(
	{
		title: { type: String, required: true },
		email: { type: String, required: true },
		author: { type: Schema.ObjectId, ref: 'User' },
	},
	{ timestamps: true },
);

export const Post = model('Post', postSchema);
