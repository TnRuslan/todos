import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ITodo } from '~shared/interfaces/todo.interface';
import { sliderStyles } from './todoSlider.styles';
import TodoItem from '../todo-item/todoItem.component';
import 'swiper/css';

interface ITodoSlider {
	todos: ITodo[];
}
const TodoSlider = ({ todos }: ITodoSlider): React.ReactNode => {
	return (
		<Swiper
			className={sliderStyles}
			grabCursor
			centeredSlides={true}
			slidesPerView={1}
			centeredSlidesBounds={true}
			spaceBetween={20}
		>
			{todos.map((todo) => (
				<SwiperSlide key={todo.id}>
					<TodoItem todo={todo} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default TodoSlider;
