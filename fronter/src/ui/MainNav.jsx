import { NavLink } from "react-router-dom";
import { getUserRol } from "../services/apiAuth";
import styled from "styled-components";
import supabase from "../services/supabase";

import {
  HiChatBubbleLeftRight,
  HiCurrencyDollar,
  HiShoppingCart,
  HiOutlineQueueList,
  HiHeart,
} from "react-icons/hi2";

import { MdAdminPanelSettings } from "react-icons/md";

import { MdAddComment } from "react-icons/md";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    font-size: 1.7rem;
    font-weight: 500;
    padding: 2.5rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 3.3rem;
    height: 3.3rem;
    color: var(--color-grey-500);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  const userRol = await getUserRol();

  return userRol;
}

const now = await getCurrentUser();
let adminshow;
if (now === "admin") {
  adminshow = (
    <>
      <li>
        <StyledNavLink to="/Admin">
          <MdAdminPanelSettings />
          <span>Admin</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/sugerencias">
          <MdAddComment />
          <span>Sugerencias</span>
        </StyledNavLink>
      </li>
    </>
  );
}

let heading;

if (now !== "admin") {
  heading = (
    <>
      <li>
        <StyledNavLink to="/Productos">
          <HiOutlineQueueList />
          <span>Agregar Articulos</span>
        </StyledNavLink>
      </li>

      <li>
        <StyledNavLink to="/Subscripcion">
          <HiCurrencyDollar />
          <span>Suscripción</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/Marcador">
          <HiHeart />
          <span>Guardado</span>
        </StyledNavLink>
      </li>
    </>
  );
}

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/Articulos">
            <HiShoppingCart />
            <span>Articulos</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/Mensajes">
            <HiChatBubbleLeftRight />
            <span>Mensajes</span>
          </StyledNavLink>
        </li>
        <>{heading}</>
        <>{adminshow}</>
      </NavList>
    </nav>
  );
}

export default MainNav;
