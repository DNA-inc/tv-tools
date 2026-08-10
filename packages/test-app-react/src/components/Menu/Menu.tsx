import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Interactable, VerticalFocus } from '@salik1992/tv-tools-react/focus';
import { useMenuItems } from '../../hooks/useMenuItems';
import { getCurrentPath } from '../../utils/getCurrentPath';
import { menuItemToPath } from '../../utils/menuItemToPath';
import { tokens } from '../Theme/tokens';
import { H1 } from '../Typography';
import * as css from './Menu.module.scss';

const openWidth =
	tokens.menu.openColumns.unitless * tokens.typography.column.px;

const WIDTH = {
	closed: tokens.menu.closedColumns.unitless * tokens.typography.column.px,
	open: openWidth,
	shade: tokens.screen.width.px - openWidth,
} as const;

export const Menu = ({
	id,
	isOpen,
	onMouseOpen,
	onMouseClose,
}: {
	id: string;
	isOpen: boolean;
	onMouseOpen: () => void;
	onMouseClose: () => void;
}) => {
	const navigate = useNavigate();
	const currentPath = getCurrentPath();
	const menuItems = useMenuItems();

	const onPresses = useMemo(
		() =>
			menuItems.map((item) => () => {
				const itemPath = menuItemToPath(item);
				onMouseClose();
				if (getCurrentPath() !== itemPath) {
					navigate(itemPath, { replace: true });
				}
				return true;
			}),
		[navigate, menuItems, onMouseClose],
	);

	return (
		<div
			className={`${css.wrap} ${isOpen ? css.open : ''}`}
			onMouseOver={onMouseOpen}
		>
			<div className={css['menu-background']} />
			<div className={css['menu-shade']} onMouseOver={onMouseClose} />
			<div className={css['items-wrap']}>
				<VerticalFocus id={id}>
					{menuItems.map((item, i) => {
						const path = menuItemToPath(item);
						const isActive = currentPath === path;
						return (
							<Interactable
								className={`${css.item} ${isActive ? css.active : ''}`}
								key={path}
								onPress={onPresses[i]}
								focusOnMount={isOpen && isActive}
							>
								<H1>
									<span className={css.glyph}>
										{item.glyph}
									</span>
									{item.title}
								</H1>
							</Interactable>
						);
					})}
				</VerticalFocus>
			</div>
		</div>
	);
};
Menu.width = WIDTH;
